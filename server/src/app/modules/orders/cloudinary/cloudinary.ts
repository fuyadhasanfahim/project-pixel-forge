import cloudinary from 'cloudinary'
import { Request, Response } from 'express'
import config from '../../../config'

const { cloudinary_api_key, cloudinary_api_secret, cloudinary_cloud_name } =
    config

cloudinary.v2.config({
    cloud_name: cloudinary_cloud_name,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret,
})

const uploadToCloudinary = async (filePath: string, userName: string) => {
    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const dateFolder = `${day}-${month}-${year}`

    return await cloudinary.v2.uploader.upload(filePath, {
        folder: `${userName}/${dateFolder}`,
    })
}

const uploadFiles = async (req: Request, res: Response) => {
    try {
        const files = req.body.orders?.files
        const userName = req.body.orders?.userName

        const uploadPromises = files.map((file: { path: string }) =>
            uploadToCloudinary(file.path, userName),
        )
        const uploadedFiles = await Promise.all(uploadPromises)

        res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',
            uploadedFiles,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error,
        })
    }
}

export default uploadFiles
