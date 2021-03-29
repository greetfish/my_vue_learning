import '../assets/styles/foot.css'

export default {
  data () {
    return {
      author: 'mme'
    }
  },
  render () {
    return (
        <div id="footer">
            <span>Written by {this.author}</span>
        </div>
    )
  }
}
