import React from 'react';
import './DogShow.css';

class DogShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentPicture: {},
      storedPictures: [],
    }
    this.getDogPictures = this.getDogPictures.bind(this);
  }

  saveDogPicture() {
    this.setState(
      ({ currentPicture, storedPictures }) => ({ storedPictures: [...storedPictures, currentPicture] })
    );
  }

  async getDogPictures() {
    this.setState(
        {isLoading: true},
        async () => {
            const request = 'https://dog.ceo/api/breeds/image/random'
            const header = { headers: { accept: 'application/json' } }
            const fetchResult = await fetch(request, header);
            const dogObject = await fetchResult.json();
            this.setState(
              {
                currentPicture: dogObject,
                isLoading: false,
              },
              () => { 
                  this.saveDogPicture();
                  localStorage.setItem('currentPicture', dogObject.message);
                },
            );
            console.log('getDogPictures');
        });
  }

  componentDidMount() {
    this.getDogPictures();
  }

  shouldComponentUpdate(nextProps, nextSate){
      const terrier = nextSate.currentPicture.message;
      console.log(terrier)
    if (terrier && terrier.includes('terrier')) {
        console.log(terrier.includes('terrier'));
        return false;
    }
    return true;
  }

  render() {
     const { currentPicture, storedPictures, isLoading } = this.state;
     const loadingMessage = <span className="message-load">Loading...</span>;
     console.log('renderizou');
    return (
        <div>
            <h4>Click in the button bellow to see more dogs</h4>
            <button onClick={ this.getDogPictures }>See another dog</button>
            <p>Current Selected Dog: </p>
            { isLoading ? loadingMessage : <img src={ currentPicture.message } className="dog-current"/> }
            <p>Visualized Dogs: </p>
            <ul className="dog-list">
                { 
                    storedPictures.map(
                    (picture, key) => <li key={ key } className="dog-list-item">
                        <img src={ picture.message } alt="the dog" className="dog-image-list"/>
                        </li>
                    ) 
                }
            </ul>
        </div>
    );
  }
}
export default DogShow;