import ReactOnRails from 'react-on-rails';
import QuestionsIndex from '../components/QuestionsIndex';
import HelloWorld from '../components/HelloWorld';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  QuestionsIndex,
  HelloWorld,
  
});
