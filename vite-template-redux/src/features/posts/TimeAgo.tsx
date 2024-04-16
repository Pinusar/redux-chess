import { parseISO, formatDistanceToNow } from 'date-fns'

export function TimeAgo({timestamp} : TimeAgoProps){
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export interface TimeAgoProps {
  timestamp: string
}