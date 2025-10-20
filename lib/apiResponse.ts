import { NextResponse } from 'next/server'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function createSuccessResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message
  })
}

export function createErrorResponse(error: string, status: number = 500): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error
  }, { status })
}

export function handleApiError(error: any, context: string = 'API'): NextResponse<ApiResponse> {
  console.error(`${context} Error:`, error)
  
  // Handle Prisma errors
  if (error.code === 'P2002') {
    return createErrorResponse('Duplicate entry found', 409)
  }
  
  if (error.code === 'P2025') {
    return createErrorResponse('Record not found', 404)
  }
  
  // Handle database connection errors
  if (error.message?.includes('DATABASE_URL') || error.message?.includes('postgresql://')) {
    return createErrorResponse('Database connection error. Please check environment variables.', 500)
  }
  
  // Handle validation errors
  if (error.name === 'ValidationError') {
    return createErrorResponse('Invalid data provided', 400)
  }
  
  // Generic error
  return createErrorResponse(error.message || 'Internal server error', 500)
}

export async function safeApiCall<T>(
  operation: () => Promise<T>,
  context: string = 'API'
): Promise<NextResponse<ApiResponse<T>>> {
  try {
    const data = await operation()
    return createSuccessResponse(data)
  } catch (error) {
    return handleApiError(error, context)
  }
}
