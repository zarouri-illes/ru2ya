import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { build } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function prerender() {
  // Build SSR bundle
  await build({
    root,
    plugins: [react()],
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: 'dist/server',
      rollupOptions: {
        output: { format: 'esm' }
      }
    }
  })

  // Load the rendered app (use pathToFileURL for Windows compatibility)
  const serverEntry = path.resolve(root, 'dist/server/entry-server.js')
  const { render } = await import(pathToFileURL(serverEntry).href)
  const appHtml = render()

  // Read client build's index.html
  const template = fs.readFileSync(path.resolve(root, 'dist/index.html'), 'utf-8')

  // Inject the rendered content
  const finalHtml = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  fs.writeFileSync(path.resolve(root, 'dist/index.html'), finalHtml)

  // Clean up SSR build
  fs.rmSync(path.resolve(root, 'dist/server'), { recursive: true, force: true })

  console.log('Prerendered HTML injected successfully')
}

prerender().catch(err => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
