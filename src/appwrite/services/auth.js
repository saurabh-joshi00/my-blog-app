import { Account, Client, ID } from 'appwrite'
import config from '../../config/config'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setProject(config.appwriteProjectId)
            .setEndpoint(config.appwriteUrl);

        this.account = new Account(this.client);
    }

    // Sign-up/Register functionality
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                // if account is created, logged-into that directly
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    // Sign-in/Log-in functionality
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // If user is logged-in or not (Get the currently logged in user)
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null
    }

    // Sign-out/Log-out functionality
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService