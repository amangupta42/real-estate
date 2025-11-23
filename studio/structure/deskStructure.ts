import { StructureBuilder } from 'sanity/structure'
import {
  HomeIcon,
  DocumentsIcon,
  UsersIcon,
  PinIcon,
  CogIcon,
  StarIcon,
  RocketIcon,
  CheckmarkCircleIcon,
} from '@sanity/icons'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Real Estate CMS')
    .items([
      // Dashboard (future enhancement)
      S.listItem()
        .title('Dashboard')
        .icon(HomeIcon)
        .child(
          S.component()
            .component(() => (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>📊 Dashboard</h1>
                <p>Welcome to your Real Estate CMS</p>
                <p style={{ color: '#999', marginTop: '1rem' }}>
                  Future: Project statistics, recent updates, and quick actions will appear
                  here
                </p>
              </div>
            ))
            .title('Dashboard')
        ),

      S.divider(),

      // Projects - Organized by Status
      S.listItem()
        .title('Projects')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Projects by Status')
            .items([
              // Ongoing Projects
              S.listItem()
                .title('Ongoing Projects')
                .icon(RocketIcon)
                .child(
                  S.documentList()
                    .title('Ongoing Projects')
                    .filter('_type == "project" && status == "Ongoing"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),

              // Completed Projects
              S.listItem()
                .title('Completed Projects')
                .icon(CheckmarkCircleIcon)
                .child(
                  S.documentList()
                    .title('Completed Projects')
                    .filter('_type == "project" && status == "Completed"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),

              // Upcoming Projects
              S.listItem()
                .title('Upcoming Projects')
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title('Upcoming Projects')
                    .filter('_type == "project" && status == "Upcoming"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),

              S.divider(),

              // All Projects
              S.listItem()
                .title('All Projects')
                .icon(DocumentsIcon)
                .child(
                  S.documentList()
                    .title('All Projects')
                    .filter('_type == "project"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // Testimonials
      S.listItem()
        .title('Testimonials')
        .icon(UsersIcon)
        .child(
          S.documentList()
            .title('Testimonials')
            .filter('_type == "testimonial"')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),

      // Neighborhood Guides
      S.listItem()
        .title('Neighborhood Guides')
        .icon(PinIcon)
        .child(
          S.documentList()
            .title('Neighborhood Guides')
            .filter('_type == "neighborhoodGuide"')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.divider(),

      // Company Legacy (Singleton)
      S.listItem()
        .title('Company Legacy')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('legacyPage')
            .documentId('legacy-singleton')
            .title('Company Legacy')
        ),

      S.divider(),

      // Settings & Configuration
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.documentTypeListItem('project').title('Manage Project Schema'),
              S.documentTypeListItem('testimonial').title('Manage Testimonial Schema'),
              S.documentTypeListItem('neighborhoodGuide').title(
                'Manage Neighborhood Schema'
              ),
            ])
        ),
    ])

export default deskStructure
