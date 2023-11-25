import { locations } from '../functions/locations'

export default function MonitorDayAverage({ location, min, max, avg }) {
  return (
    <>
      <br />
      <small>
        {locations[location] || location}: {min} / {max} / {avg} ms
      </small>
    </>
  )
}
