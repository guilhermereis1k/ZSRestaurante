import "../style/Home.css";
import { Link } from "react-router";

const Home = () => {
    return (
        <div className="home">
            <div className="home__box margin-20">
                <h1 className="home__titulo">FAÇA SEU MENU</h1>
                <p className="home__texto">
  Escolha sua entrada, prato principal e sobremesa para montar seu menu ideal.  
  Aqui você tem a melhor opção de <strong style={{ color: "#f8c471" }}>menu degustação</strong> de São Paulo, podendo escolher livremente sua combinação.
</p>

                <Link to="/pedido/entrada"><button className="home__botao button">Pedir agora</button></Link>
            </div>
        </div>
    )
}

export default Home;