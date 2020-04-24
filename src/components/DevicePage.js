import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Card, CardContent } from "@material-ui/core"
import { graphql } from "gatsby"

import DeviceVersions from './DeviceVersions'

const useStyles = makeStyles({
  grid: {
    height: "100%",
  },
})

export default function Device(props) {
  const classes = useStyles()
  var deviceList = props.deviceList
  var urlDevice = props.boardName

  var selectedDevice = deviceList.filter(function (device) {
    return device.Codename === urlDevice
  })[0]

  function splitVersion(versionstring) {
    var values = versionstring.split("<br>")
    return {
      version: values[1],
      platform: values[0]
    }
  }

  var formattedDevice = {
    Codename: selectedDevice.Codename,
    Brand_names: selectedDevice.Brand_names,
    Stable: splitVersion(selectedDevice.Stable),
    Beta: splitVersion(selectedDevice.Beta),
    Dev: splitVersion(selectedDevice.Dev),
    Canary: splitVersion(selectedDevice.Canary),
  }
  return (
    <Grid
      container
      className={classes.grid}
      alignContent="center"
      justify="center"
    >
      <Grid item>
        <h1>{selectedDevice.Brand_names}</h1>
        <p>{selectedDevice.Codename}</p>
        <DeviceVersions device={formattedDevice} />
      </Grid>
    </Grid>
  )
}