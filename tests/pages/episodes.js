import PO from '../page-object';

export default PO.create({
  visit: PO.visitable('/episodes'),
  episodes: PO.collection({
    itemScope: 'ul.episodes li',
    item: {
      title: PO.text('h1')
    }
  })
});
