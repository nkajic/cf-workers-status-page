import { locations } from '../functions/locations'

export default function MonitorDayAverage({ location, min, max, avg, n }) {

  min = min / 1000
  max = max / 1000
  avg = avg / 1000
  
  return (
    <>
      <br />
      <br />
      <small>
        <span className="font-semibold">{locations[location] || location}</span> (n={n}):<br />
        {min} / {max} / {avg} sec 
      </small>
    </>
  )
}
