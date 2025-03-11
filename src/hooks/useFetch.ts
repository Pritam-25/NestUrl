import { useState } from "react"

export const useFetch = <T, Args extends any[]>(callback: (...args: Args) => Promise<T>) => {

    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fn = async (...args: Args) => {
        setLoading(true)
        setError(null)
        try {
            const response = await callback(...args);
            setData(response)
            setError(null)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }
    return { data, loading, error, fn }
}