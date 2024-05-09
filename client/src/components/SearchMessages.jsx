import React, { useState } from 'react';
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP

const SearchMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [author, setAuthor] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Faites une requête GET vers votre endpoint de recherche avec les critères de recherche
      const response = await axios.get(`/api/messages/search`, {
        params: {
          searchTerm: searchQuery, // Changement ici
          startDate: startDate,
          endDate: endDate,
          author: author
        }
      });
      
      
      // Mettez à jour l'état avec les résultats de la recherche renvoyés par l'API
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  return (
    <div>
      <h2>Rechercher des Messages</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Auteur"
      />
      <button onClick={handleSearch}>Rechercher</button>

      {/* Afficher les résultats de la recherche */}
      {searchResults.map((result, index) => (
        <div key={index}>
          <p>Contenu du message: {result.content}</p>
          <p>Date de création: {result.date}</p>
          <p>Propriétaire: {result.author}</p>
          {/* Ajoutez d'autres détails du message si nécessaire */}
        </div>
      ))}
    </div>
  );
};

export default SearchMessages;
