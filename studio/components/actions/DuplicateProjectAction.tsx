import { useCallback } from 'react'
import { useRouter } from 'sanity/router'
import { DocumentActionComponent, useDocumentOperation } from 'sanity'
import { CopyIcon } from '@sanity/icons'

export const DuplicateProjectAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props
  const { duplicate } = useDocumentOperation(id, type)
  const router = useRouter()

  const onHandle = useCallback(() => {
    if (!published) {
      alert('Please publish the project before duplicating')
      return
    }

    // Generate new slug
    const originalSlug = published.slug?.current || ''
    const timestamp = Date.now()
    const newSlug = `${originalSlug}-copy-${timestamp}`

    // Create duplicate with modifications
    const duplicateData = {
      ...published,
      _id: undefined,
      _rev: undefined,
      _createdAt: undefined,
      _updatedAt: undefined,
      title: `${published.title} (Copy)`,
      slug: {
        _type: 'slug',
        current: newSlug,
      },
      status: 'Upcoming', // Reset status to Upcoming
      interactiveLayoutData: [], // Clear interactive layout data
      currentPhase: 'Planning', // Reset phase
    }

    // Create the duplicate
    duplicate.execute()

    // Navigate to the new document
    setTimeout(() => {
      router.navigateIntent('edit', { id: newSlug, type: 'project' })
    }, 1000)
  }, [published, duplicate, router])

  // Only show action for project documents
  if (type !== 'project') {
    return null
  }

  return {
    label: 'Duplicate Project',
    icon: CopyIcon,
    onHandle,
    disabled: !published,
    title: !published
      ? 'Publish the project before duplicating'
      : 'Create a copy of this project',
  }
}
