import {
  BookIcon,
  ComposeIcon,
  DocumentIcon,
  HelpCircleIcon,
  HomeIcon,
} from '@sanity/icons'
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@sanity/ui'
import {useEffect, useMemo, useState} from 'react'
import {definePlugin, useClient, useWorkspace} from 'sanity'

type RecentDocument = {
  _id: string
  _type: string
  _updatedAt: string
  title?: string
  name?: string
  slug?: {current?: string}
}

const RECENT_DOCUMENTS_QUERY = `
  *[
    _type != "sanity.imageAsset" &&
    _type != "sanity.fileAsset"
  ] | order(_updatedAt desc)[0...6]{
    _id,
    _type,
    _updatedAt,
    title,
    name,
    slug
  }
`
const apiVersion = '2024-12-01'

function formatDocumentTitle(doc: RecentDocument) {
  return doc.title || doc.name || doc.slug?.current || 'Untitled'
}

function RecentDocumentsCard() {
  const client = useClient({apiVersion})
  const [recentDocuments, setRecentDocuments] = useState<RecentDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    client
      .fetch<RecentDocument[]>(RECENT_DOCUMENTS_QUERY, {}, {signal: controller.signal})
      .then((docs) => setRecentDocuments(docs))
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [client])

  return (
    <Card padding={4} radius={3} shadow={1}>
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <DocumentIcon />
          <Heading as="h3" size={2}>
            Recent updates
          </Heading>
        </Flex>

        {loading && (
          <Flex align="center" gap={2}>
            <Spinner muted />
            <Text muted>Loading recent documents…</Text>
          </Flex>
        )}

        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Text>Unable to load recent documents: {error}</Text>
          </Card>
        )}

        {!loading && !error && recentDocuments.length === 0 && (
          <Text muted>No documents have been edited yet.</Text>
        )}

        {!loading && !error && recentDocuments.length > 0 && (
          <Stack space={3}>
            {recentDocuments.map((doc) => (
              <Card key={doc._id} padding={3} radius={2} tone="transparent" border>
                <Flex align="center" justify="space-between" gap={3}>
                  <Stack space={2}>
                    <Text weight="semibold">{formatDocumentTitle(doc)}</Text>
                    <Text muted size={1}>
                      Type: {doc._type}
                    </Text>
                  </Stack>
                  <Badge tone="primary" mode="outline">
                    {new Date(doc._updatedAt).toLocaleString()}
                  </Badge>
                </Flex>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

function QuickActionsCard() {
  const actions = useMemo(
    () => [
      {
        title: 'Open content desk',
        description: 'Browse and edit documents in the Desk tool.',
        href: '/desk',
        icon: ComposeIcon,
      },
      {
        title: 'Review promotions',
        description: 'Jump directly to promotion entries.',
        href: '/desk/promotion',
        icon: BookIcon,
      },
      {
        title: 'Sanity docs',
        description: 'Read platform guides and best practices.',
        href: 'https://www.sanity.io/docs',
        icon: HelpCircleIcon,
      },
    ],
    []
  )


}
