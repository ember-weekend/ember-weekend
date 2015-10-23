export default function() {
  this.transition(
    this.fromRoute('episodes.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('root.about'),
    this.use('toUp'),
    this.reverse('toDown')
  );

  this.transition(
    this.toRoute('root.blog'),
    this.use('toDown'),
    this.reverse('toUp')
  );

  this.transition(
    this.fromRoute('root.blog'),
    this.toRoute('root.blog.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
