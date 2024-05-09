import React, { useState } from 'react';
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP
import '../styles/SearchMessages.css'

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
    <div className="search-messages-container">
      <h2>Rechercher des messages</h2>
      <div className="search-messages-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Recherche"
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
      </div>

      <div className="search-results">
        
        {searchResults.map((result, index) => (
          
          <div className="search-result" key={index}>
            
            <p>Contenu du message: <b>{result.content}</b></p>
            <p>Date de création: <b>{result.date}</b></p>
            <p>Propriétaire: <b>{result.author}</b></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMessages;
