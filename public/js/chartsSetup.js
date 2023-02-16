
const colors = {
  solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
}

const getApiData = () => {

  axios
    .get('https://multiapi-app.fly.dev/coasters/allCoasters')
    .then(({ data }) => {
      printCoastersCharts(data)
      printCoastersLength(data)
      printCoastersCountries(data)
      printCoastersinversions(data)
    })
    .catch(err => console.log(err))

}

const printCoastersCharts = coasters => {


  // console.log(coasters)
  // console.log(coasters.sort((a, b) => b.speed - a.speed))

  const fastest = coasters.sort((a, b) => b.speed - a.speed)
  const fiveFastest = fastest.slice(0, 5)
  const names = fiveFastest.map(({ name }) => name)
  const speeds5 = fiveFastest.map(({ speed }) => speed)

  const data = {
    labels: names,
    datasets: [{
      data: speeds5,
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  new Chart('chart1', {
    type: 'bar',
    data,
    options
  })

}

const printCoastersLength = coasters => {


  const data = {
    labels: ['- 1000m', '1000 - 1500m', '+ 1500m'],
    datasets: [{
      data: [
        coasters.filter(elm => elm.length < 1000).length,
        coasters.filter(elm => elm.length >= 1000 && elm.length < 1500).length,
        coasters.filter(elm => elm.length >= 1500).length
      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'left'
      }
    }
  }

  new Chart('chart2', {
    type: 'doughnut',
    data,
    options
  })

}

const printCoastersCountries = coasters => {


  const data = {
    labels: ['EEUU', 'España', 'Japón', 'China'],
    datasets: [{
      data: [
        coasters.filter(elm => elm.country === 'United States').length,
        coasters.filter(elm => elm.country === 'Japan').length,
        coasters.filter(elm => elm.country === 'Spain').length,
        coasters.filter(elm => elm.country === 'China').length,

      ],
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'left'
      }
    }
  }

  new Chart('chart3', {
    type: 'polarArea',
    data,
    options
  })

}

const printCoastersinversions = coasters => {

  const mostinversions = coasters.filter(elm => elm.inversions > 5)
  const names = mostinversions.map(({ name }) => name)
  const inversions5 = mostinversions.map(({ inversions }) => inversions)

  const data = {
    labels: names,
    datasets: [{
      data: inversions5,
      backgroundColor: colors.alphas,
      borderColor: colors.solids,
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'left'
      }
    }
  }

  new Chart('chart4', {
    type: 'radar',
    data,
    options
  })

}


getApiData()