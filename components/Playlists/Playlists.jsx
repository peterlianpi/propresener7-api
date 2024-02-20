function Playlists({ playlist }) {
  const myPlaylists = playlist;
  return (
    <div>
      <ul>
        {myPlaylists.map((playlist, index) => (
          <div key={index}>
            <h3>{playlist.playlistName}</h3>
            <ul>
              {playlist.playlist.map((playlistItem, itemIndex) => (
                <li key={itemIndex}>
                  <div>Name: {playlistItem.playlistItemName}</div>
                  <div>Type: {playlistItem.playlistItemType}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}
export default Playlists;
