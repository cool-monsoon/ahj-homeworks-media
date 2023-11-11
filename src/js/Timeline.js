import createElement from './createElement';
import geolocationValidation from './geolocationValidation';

export default class Timeline {
  constructor() {
    this.container = document.querySelector('.container');
    this.addPost = this.addPost.bind(this);
    this.element = null;
  }

  createTimeline() {
    const timeline = createElement('div', {
      className: 'timeline-container',
      innerHTML: `
      <div class="posts-list"></div>
      <div class="footer">
      <form class="form">
        <input class="form-input" name="input" type="text">
      </form>
    </div>`,
    });

    this.container.appendChild(timeline);
    document.querySelector('.form').addEventListener('submit', this.addPost);
  }

  addPost(event) {
    event.preventDefault();
    this.element = createElement('span', {
      textContent: event.target.input.value,
    });

    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          const activeLatitude = latitude;
          const activeLongitude = longitude;
          const data = `${activeLatitude}, ${activeLongitude}`;

          this.showPost(data);
        },
        (error) => {
          this.showModal();
          console.error(error);
        },
      );
    }
  }

  resetInput() {
    this.container.querySelector('.form-input').value = '';
  }

  showPost(data) {
    const list = document.querySelector('.posts-list');
    const post = createElement('div', {
      className: 'post',
      innerHTML: `
      <div class="post-text"></div>
       <div class="date">${new Date().toLocaleString()}</div>
       <div class="location">[${data}]</div>`,
    });

    list.insertAdjacentElement('afterbegin', post);
    this.container
      .querySelector('.post-text')
      .insertAdjacentElement('afterbegin', this.element);
    this.resetInput();
  }

  showModal() {
    const modal = createElement('div', {
      className: 'modal',
      innerHTML: `
      <div class="modal-text">
      <p>Что-то пошло не так</p>
        <p>
          К сожалению, нам не удалось определить Ваше местоположение.
          Пожалуйста, дайте разрешение на использование геолокации 
          либо введите координаты вручную
        </p>
        <p>Широта и долгота через запятую:</p>
        <form class="modal-form">
          <input class="modal-input" name="modal" type="text">
          <div class="buttons">
            <button type="reset" class="reset">Отмена</button>
            <button type="submit" class="ok">Ok</button>
          </div>
        </form>
      </div>`,
    });

    this.container.querySelector('.timeline-container').appendChild(modal);

    this.container
      .querySelector('.modal-input')
      .addEventListener('input', this.deleteError);

    this.container
      .querySelector('.modal-form')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        const isValid = geolocationValidation(event.target.modal.value);

        if (isValid) {
          this.hideModal();
          this.showPost(isValid);
        } else {
          alert('Таких координат не существует');
        }
      });

    this.container
      .querySelector('.modal-form')
      .addEventListener('reset', (event) => {
        event.preventDefault();
        this.hideModal();
      });
  }

  hideModal() {
    this.container.querySelector('.modal').remove();
    this.resetInput();
  }
}
