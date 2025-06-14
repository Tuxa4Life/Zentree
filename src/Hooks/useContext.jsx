import { useContext } from "react"
import ApiContext from "../Context/apiContext"

const useApiContext = () => { return useContext(ApiContext) }

export { useApiContext }