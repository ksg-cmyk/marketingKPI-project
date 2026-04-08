export type ChannelType = 'sns' | 'crm' | 'email' | 'push'

export const CHANNEL_LABELS: Record<ChannelType, string> = {
  sns: 'SNS',
  crm: 'CRM',
  email: '이메일',
  push: '푸시',
}
