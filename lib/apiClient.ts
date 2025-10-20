// Client-side API utilities with safety checks
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export async function safeFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
    const fullUrl = `${baseUrl}${url}`
    
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export function safeSlice<T>(array: T[] | undefined | null, start: number = 0, end?: number): T[] {
  if (!Array.isArray(array)) {
    return []
  }
  return array.slice(start, end)
}

export function safeMap<T, U>(
  array: T[] | undefined | null,
  callback: (item: T, index: number) => U
): U[] {
  if (!Array.isArray(array)) {
    return []
  }
  return array.map(callback)
}

export function safeFilter<T>(
  array: T[] | undefined | null,
  callback: (item: T, index: number) => boolean
): T[] {
  if (!Array.isArray(array)) {
    return []
  }
  return array.filter(callback)
}
