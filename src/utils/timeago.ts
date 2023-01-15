import { register, format as form } from 'timeago.js'
import ko from 'timeago.js/lib/lang/ko'

register('ko', ko)

export default function format(time: string) {
  return form(time, 'ko')
}
