
export async function uploadImage(imageFile: File) {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const base64data = reader.result as string

      try {
        const response = await fetch('/api/pinImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            imageBuffer: base64data.split(',')[1], // Remove the base64 prefix
            fileName: imageFile.name
          })
        })

        const data = await response.json()

        if (response.ok) {
          console.log(`Image pinned successfully: ${data.pinataUrl}`)
          resolve(data)
        } else {
          console.error(`Failed to pin image: ${data.error}`)
          reject(data.error)
        }
      } catch (error) {
        console.error(`Error uploading image: ${error}`)
        reject(error)
      }
    }

    reader.readAsDataURL(imageFile)
  })
}
