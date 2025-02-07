import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "./Api";

const HeroDetail = () => {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHero = async () => {
      try {
        const result = await fetchData(`/superhero/${id}`);
        setHero(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getHero();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!hero) return <div>Aucun héros trouvé</div>;

  return (
    <div className="hero-detail">
      <h1>{hero.heroname} ({hero.realname})</h1>
      <p><strong>Sexe :</strong> {hero.sexe}</p>
      <p><strong>Planète :</strong> {hero.planet}</p>
      <p><strong>Description :</strong> {hero.description}</p>
      <p><strong>Pouvoirs :</strong> {hero.superpowers}</p>
      <p><strong>Pays protégé :</strong> {hero.protectedcountry}</p>
      <p><strong>Gadgets :</strong> {hero.gadjets}</p>
      <p><strong>Équipe :</strong> {hero.team}</p>
      <p><strong>Voiture :</strong> {hero.car}</p>
    </div>
  );
};

export default HeroDetail;