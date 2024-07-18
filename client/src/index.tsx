import React from "react"
import {createRoot} from "react-dom/client"
import "./assets/index"
import {Main} from "./main"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

const root = createRoot(document.getElementById("root")!)
root.render(
	<QueryClientProvider client={queryClient}>
		<Main />
	</QueryClientProvider>
)
