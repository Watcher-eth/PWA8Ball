import type { NextApiRequest, NextApiResponse } from 'next'
import PinataClient, { PinataPinOptions, PinataPinResponse } from '@pinata/sdk'
import { Readable } from 'stream'

const PINATA_API_KEY = "<pinata api key>"
const PINATA_API_SECRET = "<pinata api>"

//   const pinataApiKey =  PINATA_API_KEY // process.env.PINATA_API_KEY
//   const pinataApiSecret = PINATA_API_SECRET // process.env.PINATA_API_SECRET

const pinata = new PinataClient(PINATA_API_KEY, PINATA_API_SECRET)

export default async function pinImageToIPFS(req: NextApiRequest, res: NextApiResponse) {
  // console.log("____________________________________________")
  // console.log({ req, res })
  // console.log("____________________________________________")

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { imageBuffer, fileName } = req.body

  if (!imageBuffer || !fileName) {
    return res.status(400).json({ error: 'Image buffer and file name are required' })
  }



  try {
    // console.log({ imageBuffer })
    const buffer = Buffer.from(imageBuffer, 'base64')
    const readableStreamForFile = new Readable()
    readableStreamForFile.push(buffer)
    readableStreamForFile.push(null) //
    // console.log({ readableStreamForFile, buffer, fileName })
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: fileName
      },
      pinataOptions: {
        cidVersion: 0
      }
    }



    const result = await pinata.pinFileToIPFS(readableStreamForFile, options)


    res.status(200).json({
      success: true,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      ...result
    })

  } catch (error) {
    console.log(error)
    console.error('Error pinning file to IPFS:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to pin image to IPFS'
    })
  }
}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}