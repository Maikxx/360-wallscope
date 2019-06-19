import { getAuthorizationToken } from './UserService'
import { toast } from 'react-toastify'

interface CreateResultParams {
    title?: string
    summary?: string
    content?: string
    data_url?: string
}

interface CreateResultResponse {
    error?: string
    result?: {
        _id: number
    }
}

export async function createResult({ title, content, data_url, summary }: CreateResultParams) {
    try {
        const token = getAuthorizationToken()

        if (token) {
            const url = `${window.location.origin}/create-result`
            const data = await fetch(
                url,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title || null,
                        summary: summary || null,
                        content: content || null,
                        data_url: data_url || null,
                    }),
                    method: 'POST',
                }
            )

            const { error, result }: CreateResultResponse = await data.json()

            if (!error && result) {
                return result
            } else {
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}
