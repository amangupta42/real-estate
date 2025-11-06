import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check for secret token to validate request is coming from Sanity
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token || token !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    // Parse the request body to get the document type and slug
    const body = await request.json()
    const { _type, slug } = body

    console.log('Revalidation request received:', { _type, slug })

    // Revalidate based on document type
    switch (_type) {
      case 'project':
        // Revalidate all project-related pages
        revalidatePath('/') // Homepage (featured projects)
        revalidatePath('/projects') // Projects listing
        if (slug?.current) {
          revalidatePath(`/projects/${slug.current}`) // Specific project page
        }
        console.log('Revalidated project pages')
        break

      case 'testimonial':
        // Revalidate homepage (testimonials section)
        revalidatePath('/')
        console.log('Revalidated testimonials')
        break

      case 'neighborhoodGuide':
        // Revalidate neighborhood guide pages
        revalidatePath('/nashik-advantage')
        if (slug?.current) {
          revalidatePath(`/nashik-advantage/${slug.current}`)
        }
        console.log('Revalidated neighborhood guide')
        break

      case 'legacyPage':
        // Revalidate legacy page
        revalidatePath('/legacy')
        console.log('Revalidated legacy page')
        break

      default:
        // For any other content type, revalidate homepage as a fallback
        revalidatePath('/')
        console.log('Revalidated homepage (fallback)')
    }

    return NextResponse.json({
      revalidated: true,
      message: `Successfully revalidated ${_type}`,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      {
        revalidated: false,
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Optional: Support GET requests to check if the endpoint is working
export async function GET() {
  return NextResponse.json({
    message: 'Revalidation endpoint is active. Use POST with valid token to trigger revalidation.',
  })
}
