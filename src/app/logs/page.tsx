import Link from "next/link";
import { createMDX, createMatters, readLogsPaths } from "../utils";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type MyMatter = {
  title: string;
  date: Date;
};

const LogsHomePage = async () => {
  const paths = await readLogsPaths();
  const matters = await createMatters<MyMatter>();

  return (
    <div>
      {matters.map(({ path, title, summary, date }) => {
        return (
          <Card key={path} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {summary}
              </Typography>
              <Typography variant="body2">{date.toJSON()}</Typography>
            </CardContent>
            <CardActions>
              <Link href={`/logs/${path}`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default LogsHomePage;
