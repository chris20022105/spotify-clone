import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
} from "@heroicons/react/outline";

import {
    HeartIcon,
} from "@heroicons/react/solid";

import {signOut, useSession } from "next-auth/react";
import {useEffect, useState} from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify"
import {playlistIdState} from "../atoms/playlistAtom"

function Sidebar () {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [ playlists, setPlaylists ] = useState([]);
    const [ playlistId, setPlaylistID] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    console.log(playlistId)

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm
        border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen
        sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
            <div className="space-y-4">
                <button className="flex items-center space-x-2
                hover:text-white"> {/* flex pone un icono encima del otro */}
                    <HomeIcon className="h-5 w-5"/> {/* 5 alto y 5 ancho*/}
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2
                hover:text-white">
                    <SearchIcon className="h-5 w-5"/> {/* 5 alto y 5 ancho*/}
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2
                hover:text-white">
                    <LibraryIcon className="h-5 w-5"/> {/* 5 alalto y 5 ancho*/}
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"></hr>
                
                {/* Separacion de barras  */}

                <button className="flex items-center space-x-2
                hover:text-white"> {/* flex pone un icono encima del otro */}
                    <PlusCircleIcon className="h-5 w-5"/> {/* 5 alto y 5 ancho*/}
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2
                hover:text-white">
                    <HeartIcon className="h-5 w-5 text-blue-500"/> {/* 5 alto y 5 ancho*/}
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2
                hover:text-white">
                    <RssIcon className="h-5 w-5 text-green-500"/> {/* 5 alto y 5 ancho*/}
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"></hr>

                {/* Playlist... */}
                {playlists.map((playlists) => (
                    <p key={playlists.id}
                    onClick = {() => setPlaylistID(playlists.id)}
                    className="cursor-pointer hover:text-white">{playlists.name}</p>
                ))}

            </div>
        </div>
    )
}

export default Sidebar