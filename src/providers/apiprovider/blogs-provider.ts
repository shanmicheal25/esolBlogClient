import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

export interface Params {
	[key: string]: any;
}

export interface GetOptions {
	url: string;
	params?: Params;
	data?: any;
}

export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}

@Injectable({ providedIn: "root" })
export class BlogsApiproviderProvider {

	private axiosClient: AxiosInstance;
	private errorHandler: ErrorHandler;

	//private baseUrl = "http://localhost:9090/api/v1/"

	private baseUrl = environment.APIEndpoint;

	// I initialize the ApiClient.
	constructor(errorHandler: ErrorHandler) {
		this.errorHandler = errorHandler;
		// The ApiClient wraps calls to the underlying Axios client.
		this.axiosClient = axios.create({
			timeout: 3000,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	// ---
	// PUBLIC METHODS.
	// ---
	public async get<T>(options: GetOptions): Promise<T> {
		try {
			var axiosResponse = await this.axiosClient.request<T>({
				method: "get",
				url: this.baseUrl + options.url,
				params: options.params
			});
			return (axiosResponse.data);
		} catch (error) {
			return (Promise.reject(this.normalizeError(error)));
		}
	}

	public async post<T>(options: GetOptions): Promise<T> {
		try {
			var axiosResponse = await this.axiosClient.request<T>({
				method: "post",
				url: this.baseUrl + options.url,
				data: options.data
			});
			return (axiosResponse.data);
		} catch (error) {
			return (Promise.reject(this.normalizeError(error)));
		}
	}

	public async getM<T>(options: GetOptions): Promise<T> {
		try {
			var axiosResponse = await this.axiosClient.get(
				this.baseUrl + options.url, {
					params: options.params
				});
			return (axiosResponse.data);
		} catch (error) {
			return (Promise.reject(this.normalizeError(error)));
		}
	}


	private normalizeError(error: any): ErrorResponse {
		this.errorHandler.handleError(error);
		return ({
			id: "-1",
			code: "UnknownError",
			message: "An unexpected error occurred."
		});
	}

}
