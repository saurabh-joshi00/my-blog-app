import { Client, ID, Storage } from "appwrite"
import config from "../../config/config";

export class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.storage = new Storage(this.client)
    }

    // Upload file functionality
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    // Delete file functionality
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    // Get a file preview image
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config,appwriteBucketId,
            fileId
        )
    }
}

const storageService = new StorageService()

export default storageService