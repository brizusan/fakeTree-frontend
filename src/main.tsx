import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClientProvider , QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { Router } from './router'
import './index.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
