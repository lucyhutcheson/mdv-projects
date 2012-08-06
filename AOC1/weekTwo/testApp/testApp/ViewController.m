//
//  ViewController.m
//  testApp
//
//  Created by Lucy Hutcheson on 8/5/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (void)viewWillAppear:(BOOL)animated
{
    
    
    /* 1.) CHANGE BACKGROUND COLOR =============================================================================== */
    self.view.backgroundColor = [UIColor colorWithRed:0.714 green:0.812 blue:0.827 alpha:1] /*#b6cfd3*/;

    
    
    /*------------------------------------------------------------------------------------------------------------ *
     * Book Information and UILabels                                                                               *
     *------------------------------------------------------------------------------------------------------------ */
    
    /* 1.) TITLE LABEL ==================================================================================== */

    titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(0.0f, 0.0f, 320.0f, 40.0f)];    
    if (titleLabel != nil)
    {
        titleLabel.backgroundColor = [UIColor colorWithRed:0.161 green:0.204 blue:0.212 alpha:1] /*#293436*/;
        titleLabel.text = @"The Lion, the Witch and the Wardrobe";
        titleLabel.textAlignment = UITextAlignmentCenter;
        titleLabel.textColor = [UIColor whiteColor];
    }
    [self.view addSubview:titleLabel];
    
    
    
    /* AUTHOR LABEL and AUTHOR TEXT ==================================================================== */

    // 2.) Author Label

    authorLabel = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 60.0f, 130.0f, 30.0f)];
    if (authorLabel != nil)
    {
        authorLabel.backgroundColor = [UIColor colorWithRed:0.424 green:0.086 blue:0.263 alpha:1] /*#6c1643*/;
        authorLabel.text = @"Author: ";
        authorLabel.textAlignment = UITextAlignmentRight;
        authorLabel.textColor = [UIColor colorWithRed:1 green:0.6 blue:0.8 alpha:1] /*#ff99cc*/;
    }
    [self.view addSubview:authorLabel];
    
    // 3.) Author Text

    authorText = [[UILabel alloc] initWithFrame:CGRectMake(150.0f, 60.0f, 160.0f, 30.0f)];    
    if (authorText != nil)
    {
        authorText.backgroundColor = [UIColor colorWithRed:0.6 green:0.2 blue:0.4 alpha:1] /*#993366*/;
        authorText.text = @" C.S. Lewis";
        authorText.textAlignment = UITextAlignmentLeft;
        authorText.textColor = [UIColor colorWithRed:0.306 green:0.047 blue:0.18 alpha:1] /*#4e0c2e*/;
    }    
    [self.view addSubview:authorText];

    
    
    /* PUBLISHED LABEL and PUBLISHED TEXT ================================================================= */

    // 4.) Published Label

    publishedLabel = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 100.0f, 130.0f, 30.0f)];
    if (publishedLabel != nil)
    {
        publishedLabel.backgroundColor = [UIColor colorWithRed:1 green:0.6 blue:0.8 alpha:1] /*#ff99cc*/;
        publishedLabel.text = @"Published: ";
        publishedLabel.textAlignment = UITextAlignmentRight;
        publishedLabel.textColor = [UIColor colorWithRed:0.255 green:0.373 blue:0.396 alpha:1] /*#415f65*/;
    }
    [self.view addSubview:publishedLabel];
    
    // 5.) Published Text

    publishedText = [[UILabel alloc] initWithFrame:CGRectMake(150.0f, 100.0f, 160.0f, 30.0f)];    
    if (publishedText != nil)
    {
        publishedText.backgroundColor = [UIColor colorWithRed:1 green:0.831 blue:0.918 alpha:1] /*#ffd4ea*/;
        publishedText.text = @" 16 October 1950";
        publishedText.textAlignment = UITextAlignmentLeft;
        publishedText.textColor = [UIColor colorWithRed:0.6 green:0.2 blue:0.4 alpha:1] /*#993366*/;
    }    
    [self.view addSubview:publishedText];

    
    
    /* SUMMARY LABEL and SUMMARY TEXT ================================================================= */
    
    // 6.) Summary Label

    summaryLabel = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 140.0f, 130.0f, 30.0f)];
    if (summaryLabel != nil)
    {
        summaryLabel.backgroundColor = [UIColor colorWithRed:0.545 green:0.796 blue:0.82 alpha:1] /*#8bcbd1*/;
        summaryLabel.text = @" Summary:";
        summaryLabel.textAlignment = UITextAlignmentLeft;
        summaryLabel.textColor = [UIColor colorWithRed:0.051 green:0.325 blue:0.384 alpha:1] /*#0d5362*/;
    }
    [self.view addSubview:summaryLabel];
    
    // 7.) Summary Text

    summaryText = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 180.0f, 300.0f, 130.0f)];    
    if (summaryText != nil)
    {
        summaryText.backgroundColor = [UIColor colorWithRed:0.824 green:0.969 blue:1 alpha:1] /*#d2f7ff*/;
        summaryText.text = @"The story is about four children named Peter, Susan, Edmund and Lucy and their adventures when they enter into a magical land called Narnia through a magical wardrobe. ";
        summaryText.textAlignment = UITextAlignmentCenter;
        summaryText.numberOfLines = 6;
        summaryText.textColor = [UIColor blackColor];
    }    
    [self.view addSubview:summaryText];

 
    
    /*------------------------------------------------------------------------------------------------------------ *
     * Labels and Arrays                                                                                           *
     *------------------------------------------------------------------------------------------------------------ */
    
    /* 1.) NSArray =============================================================================================== */
    
    NSArray *listOfItems = [[NSArray alloc] initWithObjects:@"wardrobe", @"Mr. Tumnus", @"lamppost", @"Aslan", @"White Witch", nil];
    
    /* 2.) NSMutableString ======================================================================================= */

    NSMutableString *listMutableString = [[NSMutableString alloc] init];
    
    // Loop through NSArray and append to NSMutableString
    for (int i=0; i < [listOfItems count]; i++) 
    {
        NSString *listItem = [listOfItems objectAtIndex:i];
        
        // If it's the last item, format doesn't include ","
        if ([listOfItems count] == i+1){ 
            [listMutableString appendString:[[NSString alloc] initWithFormat:@"%@", listItem]]; 
            
        // Separate all items with a ", "
        } else {
            [listMutableString appendString:[[NSString alloc] initWithFormat:@"%@, ", listItem]];
        }
    }

    // 3.) List of Items Label

    listLabel = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 320.0f, 130.0f, 30.0f)];
    if (listLabel != nil)
    {
        listLabel.backgroundColor = [UIColor colorWithRed:0.051 green:0.325 blue:0.384 alpha:1] /*#0d5362*/;
        listLabel.text = @" List of Items: ";
        listLabel.textAlignment = UITextAlignmentLeft;
        listLabel.textColor = [UIColor colorWithRed:0.824 green:0.969 blue:1 alpha:1] /*#d2f7ff*/;
    }
    [self.view addSubview:listLabel];
    
    // 4.) List of Items Text

    listText = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 360.0f, 300.0f, 70.0f)];    
    if (listText != nil)
    {
        listText.backgroundColor = [UIColor colorWithRed:0.122 green:0.51 blue:0.545 alpha:1] /*#1f828b*/;
        listText.text = listMutableString;
        listText.textAlignment = UITextAlignmentCenter;
        listText.numberOfLines = 3;
        listText.textColor = [UIColor colorWithRed:0.161 green:0.204 blue:0.212 alpha:1] /*#293436*/;
    }    
    [self.view addSubview:listText];
 
    
    /* END OF PROJECT 2 ========================================================================================== */


    
    [super viewWillAppear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

@end
