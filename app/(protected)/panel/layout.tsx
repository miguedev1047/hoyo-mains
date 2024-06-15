import { sitePanel } from '@/config/site'
import { Metadata } from 'next'
import PanelLayout from '@/render/layouts/panel-layout'

export const metadata: Metadata = {
  title: {
    default: 'Admin Panel',
    template: `%s - ${sitePanel.name}`
  },
  description: sitePanel.description,
  icons: {
    icon: '/favicon.ico'
  }
}

export default PanelLayout
