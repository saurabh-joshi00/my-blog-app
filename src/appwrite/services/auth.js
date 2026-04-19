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

    // Sign-up functionality
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

    // If any account is in the session or not
    async getCurrentAccount() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }

        return null
    }

    // Sign-out/Log-out functionality
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService