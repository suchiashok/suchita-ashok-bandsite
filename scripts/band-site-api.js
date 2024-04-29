
export default class BandSiteApi {
    constructor() {
        this.apiKey = `37a62273-2e78-413f-befb-0357b75e2328`;
        this.baseUrl = `https://unit-2-project-api-25c1595833b2.herokuapp.com/`;
    }

    async postComment(commentObj) {
        try {
            const response = await axios.post(`${this.baseUrl}comments?api_key=${this.apiKey}`, commentObj)
            return response.data;
        }
        catch(error) {
            console.log('Error posting the comments',error);
        }
    }
    async getComment() {
        try {
            const response = await axios.get(`${this.baseUrl}comments?api_key=${this.apiKey}`)
        return response.data.reverse();
        } catch (error) {
            console.log('Error fetching the comments', error);
        }
    }
    async getShows() {
        try {
            const response = await axios.get(`${this.baseUrl}showdates?api_key=${this.apiKey}`)
            return response.data;
        }
        catch(error) {
            console.log('Error fetching the shows', error);
        } 
    }
    async likeComment(commentId) {
        try {
            const response = await axios.put(`${this.baseUrl}comments/${commentId}/like?api_key=${this.apiKey}`)
            return response.data;
        }
        catch(error) {
            console.log('Error displaying likes', error);
        }
    }
    async deleteComment(commentId) {
        try {
            const response = await axios.delete(`${this.baseUrl}comments/${commentId}?api_key=${this.apiKey}`)
            return response.data;
        }
        catch(error) {
            console.log('Error deleting comment', error);
        }
    }
}