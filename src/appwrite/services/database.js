import { Client, Query, TablesDB } from "appwrite";
import config from "../../config/config";

export class DatabaseService {
    client = new Client();
    tablesDB;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.tablesDB = new TablesDB(this.client)
    }

    // Create a blog post functionality
    async createPost({title, slug, content, featuredImage, status, userId, author}) {
        try {
            return await this.tablesDB.createRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    author
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return null
        }
    }

    // Update a blog post functionality
    async updatePost(slug, {title, content, featuredImage, status, author}) {
        try {
            return await this.tablesDB.updateRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    author
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return null
        }
    }

    // Delete a blog post functionality
    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug
            )

            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    // Get a blog post (Get a row by its unique ID)
    async getPost(slug) {
        try {
            return await this.tablesDB.getRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return null
        }
    }

    // Get a list of the blog posts according to the 'userId' and filtering them according to their 'status' (for initial load)
    async getFilteredPosts(userId, status = null) {
        try {
            const queries = [Query.equal('userId', userId)]; // Filter by user ID
            if (status) queries.push(Query.equal('status', status));

            return await this.tablesDB.listRows(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getFilteredPosts :: error", error);
            return null
        }
    }

    // Get a list of the blog posts with 'status === active' (for initial load)
    async getAllActivePosts() {
        try {
            const queries = [Query.equal('status', 'active')];

            return await this.tablesDB.listRows(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getAllActivePosts :: error", error);
            return null
        }
    }

    // Get a list of sorted, search + paginated blog posts with 'status === active' (for home feed)
    async getPaginatedPosts(limit = 6, cursor = null, direction = 'next', searchQuery = null) {
        try {
            const queries = [
                Query.equal('status', 'active'),
                Query.orderDesc('$createdAt'),
                Query.limit(limit)
            ];

            // Add search query if provided
            if (searchQuery && searchQuery.trim()) {
                queries.push(Query.or([
                    Query.search('title', searchQuery),
                    Query.search('author', searchQuery)
                ]));
            }

            if (cursor) {
                if (direction === 'next') {
                    queries.push(Query.cursorAfter(cursor));
                }
                
                if (direction === 'prev') {
                    queries.push(Query.cursorBefore(cursor));
                }
            }

            let result = await this.tablesDB.listRows(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                queries
            )

            // Add client-side filter to ensure search query matches
            if (result && searchQuery && searchQuery.trim()) {
                const filteredRows = result.rows.filter(post => 
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.author.toLowerCase().includes(searchQuery.toLowerCase())
                );

                return {
                    ...result,
                    rows: filteredRows,
                    total: filteredRows.length
                }
            }

            return result
        } catch (error) {
            console.log("Appwrite service :: getPaginatedPosts :: error", error);
            return null
        }
    }

    // Get a list of sorted, search + paginated blog posts filtered by userId and optional status (for user's own posts)
    async getPaginatedUserPosts(userId, status = null, limit = 6, cursor = null, direction = 'next', searchQuery = null) {
        try {
            const queries = [
                Query.equal('userId', userId),
                Query.orderDesc('$createdAt'),
                Query.limit(limit)
            ];

            if (status) {
                queries.push(Query.equal('status', status));
            }

            // Add search query if provided
            if (searchQuery && searchQuery.trim()) {
                queries.push(Query.or([
                    Query.search('title', searchQuery),
                    Query.search('author', searchQuery)
                ]));
            }

            if (cursor) {
                if (direction === 'next') {
                    queries.push(Query.cursorAfter(cursor));
                }

                if (direction === 'prev') {
                    queries.push(Query.cursorBefore(cursor));
                }
            }

            let result = await this.tablesDB.listRows(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                queries
            )

            // Add client-side filter to ensure search query matches
            if (result && searchQuery && searchQuery.trim()) {
                const filteredRows = result.rows.filter(post => 
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.author.toLowerCase().includes(searchQuery.toLowerCase())
                );

                return {
                    ...result,
                    rows: filteredRows,
                    total: filteredRows.length
                }
            }

            return result
        } catch (error) {
            console.log("Appwrite service :: getPaginatedUserPosts :: error", error);
            return null
        }
    }
}

const databaseService = new DatabaseService()

export default databaseService