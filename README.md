# greends-pml
Links and exercises for the course Practical Machine Learning

---

The course will follow a flipped classroom model, and most of the work will be based on the [Practical Deep Learning course](https://course.fast.ai/). During classes, the notebooks (Python code) will be run on Google Colab.

The main materials for the course are:

- Introductory video (by Jeremy Howard, about 1h35) [Lesson "0": Practical Deep Learning for Coders (2020)](https://www.youtube.com/watch?v=gGxe2mN3kAg). Optional:  instructions described in the last part of the video for installing fastai in ubuntu for a machine with NVIDIA gpu are available at [https://course20.fast.ai/start_aws](https://course20.fast.ai/start_aws)
- The lessons (videos by Jeremy Howard) available at [Practical Deep Learning for Coders 2022](https://course.fast.ai/):
  1. Getting started
  2. Deployment
  3. Neural net foundations
  4. Natural Language (NLP)
  5. From-scratch model
  6. Random forests
  7. Collaborative filtering
  8. Convolutions (CNNs)
  9. Data ethics
- Summaries of the lessons are also available at [https://course.fast.ai/](https://course.fast.ai/)
- The notebooks for the 2022 course lessons, available at [https://github.com/fastai/course22](https://github.com/fastai/course22). Those notebooks do not cover the totality of the Python code discussed in the lessons. Some of the code is only in the book (see below).
- The online book [Deep Learning for Coders with Fastai and PyTorch: AI Applications Without a PhD](https://course.fast.ai/Resources/book.html). The examples on the book are not always the examples in the lessons. 

---

Materials for course sessions
  
  - **Session 'Introduction'**
    * Run [this notebook](test_GPU.ipynb) to compare CPU with CPU+GPU (try it in Colab: first, go to menu 'runtime/change runtime type' in Colab and choose GPU as hardware accelarator)
    
  - **Session 'Getting started', from JH Lesson 1**
    - Video for Lesson 1 of [Practical Deep Learning for Coders 2022](https://course.fast.ai/) 
    - Notebooks adapted for Colab from [https://github.com/fastai/course22](https://github.com/fastai/course22):
      - [Lesson1_00_is_it_a_bird_creating_a_model_from_your_own_data.ipynb](Lesson1_00_is_it_a_bird_creating_a_model_from_your_own_data.ipynb), where one builds a classifier for images of birds and forests.
      - [Lesson1_02_saving_a_basic_fastai_model.ipynb](Lesson1_02_saving_a_basic_fastai_model.ipynb)
      - [Lesson1_03_which_image_models_are_best.ipynb](Lesson1_03_which_image_models_are_best.ipynb)
    - Notebook for Chapter 1 of the book [Deep Learning for Coders with Fastai and PyTorch](https://course.fast.ai/Resources/book.html)
      
  - **Session 'Deployment', from JH Lesson 2**
    - Edited notebook for Chapter 2 of the book [Lesson2_edited_book_02_production.ipynb](Lesson2_edited_book_02_production.ipynb), where one builds and improve a classifier for bears.
    - Deploy a fastai classifier on HuggingFace Spaces with Gradio [https://www.tanishq.ai/blog/gradio_hf_spaces_tutorial](https://www.tanishq.ai/blog/gradio_hf_spaces_tutorial)
    - To do that, you need to sign up on [Hugging Face Spaces](https://huggingface.co/spaces)
  


Some other useful links:
- [fastai documentation](https://docs.fast.ai/)
- [AIquizzes](https://aiquizzes.com/)
