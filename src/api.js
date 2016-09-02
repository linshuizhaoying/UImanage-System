import promise from "es6-promise"
import "whatwg-fetch"

export let getProjects = async (id) => {
	let response = await fetch(`/getProjects/${id}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}