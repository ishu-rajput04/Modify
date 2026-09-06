import { useContext } from 'react'
import { getSong } from '../services/song.api'
import { SongContext } from '../song.context'

export const useSong = () => {
    const context = useContext(SongContext)
    const { loading, setLoading, song, setSong } = context

    async function handlegetSong(mood) {
        setLoading(true)
        const data = await getSong(mood)
        setSong(data.song)
        setLoading(false)
    }

    return ({
        loading, song, handlegetSong
    })
}