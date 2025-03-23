export default{
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || "mongodb+srv://thomasferradatorres:Tomix123@cluster0.4tfsv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    SESSION_SECRET: process.env.SESSION_SECRET || "S3cret",
    JWT_SECRET:process.env.JWT_SECRET||"hsdbfjsabf"
}