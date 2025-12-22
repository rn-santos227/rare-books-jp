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

