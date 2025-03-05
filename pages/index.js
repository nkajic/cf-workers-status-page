import { Store } from 'laco'
import { useStore } from 'laco-react'
import Head from 'flareact/head'

import { getKVMonitors, useKeyPress } from '../src/functions/helpers'
import config from '../config.yaml'
import MonitorCard from '../src/components/monitorCard'
import MonitorFilter from '../src/components/monitorFilter'
import MonitorStatusHeader from '../src/components/monitorStatusHeader'
import ThemeSwitcher from '../src/components/themeSwitcher'
import {useState} from 'react';

const MonitorStore = new Store({
  monitors: config.monitors,
  visible: config.monitors,
  activeFilter: false,
})

const filterByTerm = (term) =>
  MonitorStore.set((state) => ({
    visible: state.monitors.filter((monitor) =>
      monitor.name.toLowerCase().includes(term),
    ),
  }))

export async function getEdgeProps() {
  // get KV data
  const kvMonitors = await getKVMonitors()

  return {
    props: {
      config,
      kvMonitors: kvMonitors ? kvMonitors.monitors : {},
      kvMonitorsLastUpdate: kvMonitors ? kvMonitors.lastUpdate : {},
    },
    // Revalidate these props once every x seconds
    revalidate: 5,
  }
}

export default function Index({ config, kvMonitors, kvMonitorsLastUpdate }) {
  const state = useStore(MonitorStore)
  const slash = useKeyPress('/')

  const [showGood, setShowGood] = useState(true)
  const [showWarning, setShowWarning] = useState(true)
  const [showNotGood, setShowNotGood] = useState(true)

  return (
    <div className="min-h-screen">
      <Head>
        <title>{config.settings.title}</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1f2a37" />
        <link rel="stylesheet" href="./style.css" />
        <script>
          {`
          function setTheme(theme) {
            document.documentElement.classList.remove("dark", "light")
            document.documentElement.classList.add(theme)
            localStorage.theme = theme
          }
          (() => {
            // const query = window.matchMedia("(prefers-color-scheme: dark)")
            // query.addListener(() => {
            //   setTheme(query.matches ? "dark" : "light")
            // })
            // if (["dark", "light"].includes(localStorage.theme)) {
            //   setTheme(localStorage.theme)
            // } else {
            //   setTheme(query.matches ? "dark" : "light")
            // }
            setTheme("dark")
          })()
          `}
        </script>
      </Head>
      <div className={`container max-w-3xl mx-auto px-4 ${showGood ? 'show-good' : ''} ${showWarning ? 'show-warning' : ''} ${showNotGood ? 'show-not-good' : ''}`}>
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-row items-center">
            <img className="h-8 w-auto" src={config.settings.logo} />
            <h1 className="ml-4 text-3xl">{config.settings.title}</h1>
          </div>
        </div>
        <MonitorStatusHeader kvMonitorsLastUpdate={kvMonitorsLastUpdate} />

        <button onClick={() => setShowGood(!showGood)}>
        {`${showGood ? "Sakrij" : "Prikaži"}`} dobre
        {` ${showGood ? "▲" : "▼"}`}
        </button>

        <button onClick={() => setShowWarning(!showWarning)}>
        {`${showWarning ? "Sakrij" : "Prikaži"}`} upozorenja
        {` ${showWarning ? "▲" : "▼"}`}
        </button>

        <button onClick={() => setShowNotGood(!showNotGood)}>
        {`${showNotGood ? "Sakrij" : "Prikaži"}`} loše
        {` ${showNotGood ? "▲" : "▼"}`}
        </button>
        
        {state.visible.map((monitor, key) => {
          return (
            <MonitorCard
              key={key}
              monitor={monitor}
              data={kvMonitors[monitor.id]}
            />
          )
        })}
      </div>
    </div>
  )
}
