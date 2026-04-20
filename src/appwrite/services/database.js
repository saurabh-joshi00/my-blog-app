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
            return false
        }
    }

    // Get a list of all the blog posts whose 'status===active'
    async getFilteredPosts() {
        try {
            return await this.tablesDB.listRows(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                [
                    Query.equal('status', 'active')
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getFilteredPosts :: error", error);
            return false
        }
    }
}

const databaseService = new DatabaseService()

export default databaseService