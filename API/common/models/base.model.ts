export default abstract class BaseModel {
    protected constructor(success: boolean) {
        this.success = success
    }

    success: boolean
}
