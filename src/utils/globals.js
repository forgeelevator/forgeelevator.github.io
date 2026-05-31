/** Site-wide values that appear in multiple places. Stored in pendingChanges under global-* IDs. */
export const GLOBALS = [
  {
    id:          'global-phone',
    label:       'Phone Number',
    original:    '(865) 803-0633',
    placeholder: '(555) 000-0000',
  },
  {
    id:          'global-email',
    label:       'Email Address',
    original:    'sales@forgeelevator.com',
    placeholder: 'hello@example.com',
  },
  {
    id:          'global-hours',
    label:       'Business Hours',
    original:    'Mon–Fri: 8:00 AM – 5:00 PM',
    placeholder: 'Mon–Fri: 9am–5pm',
  },
  {
    id:          'global-service-area',
    label:       'Service Area',
    original:    'Knoxville, Chattanooga, Tri-Cities and surrounding areas.',
    placeholder: 'City & Region',
  },
]

/** Convert a display phone string like "(865) 123-4567" to a tel: href. */
export function phoneToHref(phone) {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 7 ? `tel:+1${digits}` : 'tel:'
}

/** Convert an email string to a mailto: href. */
export function emailToHref(email) {
  return email.includes('@') ? `mailto:${email}` : 'mailto:'
}
