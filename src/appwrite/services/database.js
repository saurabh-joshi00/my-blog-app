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
    async createPost({title, slug, content, featuredImage, status, userId}) {
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
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return null
        }
    }

    // Update a blog post functionality
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.tablesDB.updateRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
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

    // Get a list of the blog posts according to the 'userId' and filtering them according to their 'status'
    async getFilteredPosts(userId, status = null) {
        try {
            const queries = [Query.equal('userId', userId)] // ← always filter by user
            if (status) queries.push(Query.equal('status', status))

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

    // Get a list of the blog posts with 'status === active'
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
}

const databaseService = new DatabaseService()

export default databaseService