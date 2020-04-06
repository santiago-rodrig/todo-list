import One from '../../../images/instructions/one.png';
import Two from '../../../images/instructions/two.png';
import Three from '../../../images/instructions/three.png';
import Four from '../../../images/instructions/four.png';
import Five from '../../../images/instructions/five.png';
import Six from '../../../images/instructions/six.png';
import Seven from '../../../images/instructions/seven.png';

// What you get is the source in the output directory

const image1 = new Image(); image1.src = One;
image1.classList.add('d-block', 'w-100');
const image2 = new Image(); image2.src = Two;
image2.classList.add('d-block', 'w-100');
const image3 = new Image(); image3.src = Three;
image3.classList.add('d-block', 'w-100');
const image4 = new Image(); image4.src = Four;
image4.classList.add('d-block', 'w-100');
const image5 = new Image(); image5.src = Five;
image5.classList.add('d-block', 'w-100');
const image6 = new Image(); image6.src = Six;
image6.classList.add('d-block', 'w-100');
const image7 = new Image(); image7.src = Seven;
image7.classList.add('d-block', 'w-100');

export default (() => [
  {
    order: 1,
    image: image1,
    title: 'Create a project by pressing Add',
  },
  {
    order: 2,
    image: image2,
    title: 'Enter a name for your project',
  },
  {
    order: 3,
    image: image3,
    title: 'You can add tasks to you project by pressing Add task',
  },
  {
    order: 4,
    image: image4,
    title: 'Enter any detail for your task such as name and description',
  },
  {
    order: 5,
    image: image5,
    title: 'Newly created tasks will appear and will be saved',
  },
  {
    order: 6,
    image: image6,
    title: 'You can delete a task',
  },
  {
    order: 7,
    image: image7,
    title: 'You can edit or mark a task as complete',
  },
])();
