const dashbordController = (req, res) => {
  res.render("adminView/Dashboard.ejs", { title: "Dashbord" })
}

export { dashbordController }
